"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PaymentSuccess } from "@/components/checkout/PaymentSuccess";
import { PENDING_ORDER_KEY } from "@/lib/checkout/mpurse";
import { formatInr } from "@/lib/inr";
import { Button } from "@/components/ui/Button";

type PayView = "loading" | "pay" | "success" | "failed" | "missing";

type StatusPayload = {
  status?: string;
  order_id?: string;
  amount?: string | number;
  error?: string;
  message?: string;
  qr_data?: string;
  intent_url?: string;
  receipt_sent?: boolean;
  mail_error?: string;
};

function resolvePayStatus(result: StatusPayload) {
  const status = (result.status || "pending").toLowerCase();
  const msg = `${result.message || ""} ${result.error || ""}`.toLowerCase();
  if (status === "failed" && /not found|database error|no record|does not exist/.test(msg)) {
    return "pending";
  }
  return status;
}

function isPhoneBrowser() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function qrImageSrc(qrData?: string, intentUrl?: string) {
  if (qrData) return qrData.startsWith("data:") ? qrData : `data:image/png;base64,${qrData}`;
  if (intentUrl) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&ecc=M&data=${encodeURIComponent(intentUrl)}`;
  }
  return "";
}

export function CheckoutPay() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<PayView>("loading");
  const [details, setDetails] = useState<StatusPayload>({});
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    setIsPhone(isPhoneBrowser());
  }, []);

  useEffect(() => {
    const orderId = searchParams.get("order_id") || sessionStorage.getItem(PENDING_ORDER_KEY) || "";
    if (!orderId) {
      setView("missing");
      return;
    }

    const poll = { cancelled: false, timer: 0 };

    const check = async () => {
      const response = await fetch("/api/mpurse.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "status", order_id: orderId }),
      });
      const raw = await response.text();
      let result: StatusPayload = {};
      try {
        result = raw ? (JSON.parse(raw) as StatusPayload) : {};
      } catch {
        throw new Error("Payment PHP is not running.");
      }
      if (poll.cancelled) return null;
      setDetails(result);
      return resolvePayStatus(result);
    };

    const finish = (next: PayView) => {
      if (poll.timer) {
        window.clearInterval(poll.timer);
        poll.timer = 0;
      }
      if (next === "success") sessionStorage.removeItem(PENDING_ORDER_KEY);
      setView(next);
    };

    const run = async () => {
      try {
        const status = await check();
        if (poll.cancelled || !status) return;
        if (status === "success" || status === "failed") {
          finish(status);
          return;
        }
        setView("pay");
      } catch {
        if (!poll.cancelled) {
          setDetails({ error: "Unable to load payment. Start the payment server with yarn php:api." });
          setView("pay");
        }
        return;
      }

      poll.timer = window.setInterval(() => {
        void (async () => {
          try {
            const next = await check();
            if (poll.cancelled || !next) return;
            if (next === "success" || next === "failed") finish(next);
          } catch {
            /* keep waiting */
          }
        })();
      }, 3000);
    };

    void run();
    return () => {
      poll.cancelled = true;
      if (poll.timer) window.clearInterval(poll.timer);
    };
  }, [searchParams]);

  const amount = details.amount !== undefined && details.amount !== null && details.amount !== "" ? Number(details.amount) : null;
  const qrSrc = qrImageSrc(details.qr_data, details.intent_url);

  if (view === "success") {
    return (
      <PaymentSuccess
        orderId={details.order_id}
        receiptSent={details.receipt_sent}
        mailError={details.mail_error}
        paidTotal={amount !== null && Number.isFinite(amount) ? amount : null}
      />
    );
  }

  const heading = view === "failed" ? "Payment not completed." : view === "missing" ? "No order found." : "Complete UPI payment.";

  return (
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] pb-16 md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="px-6 pt-8 pb-6 md:px-10 md:pt-10">
          <p className="inline-flex items-center gap-2 text-[14px] font-medium text-primary">
            <span aria-hidden className="size-3.5 rounded-[4px] bg-primary" />
            Payment
          </p>
          <h1 className="mt-4 max-w-xl text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.04em]">{heading}</h1>
        </div>
        <div className="border-t border-border px-6 py-10 md:px-10">
          <div className="max-w-lg rounded-[22px] border border-border bg-surface p-6 md:p-8">
            {view === "loading" ? <p className="text-[15px] text-muted">Preparing the UPI request.</p> : null}

            {view === "pay" ? (
              <>
                <p className="text-[15px] leading-7 text-muted">
                  {amount !== null && Number.isFinite(amount) ? `Amount ${formatInr(amount)}. ` : ""}
                  {details.order_id ? `Order ${details.order_id}.` : ""}
                </p>
                {isPhone && details.intent_url ? (
                  <a href={details.intent_url} className="button-accent mt-6 inline-flex h-11 w-full items-center justify-center">
                    Open UPI app
                  </a>
                ) : null}
                {qrSrc ? (
                  <div className="mt-6 flex flex-col items-center gap-3">
                    <p className="text-center text-[14px] leading-6 text-muted">
                      {isPhone
                        ? "Or scan this QR from another device."
                        : "Scan with GPay, PhonePe, Paytm, or any UPI app on your phone."}
                    </p>
                    <img src={qrSrc} alt="UPI QR code" className="size-60 rounded-lg border border-border" />
                  </div>
                ) : null}
                {!qrSrc && !details.intent_url ? (
                  <p className="mt-4 text-[14px] text-danger" role="alert">
                    {details.error || details.message || "Payment details are not available."}
                  </p>
                ) : null}
                <p className="mt-6 text-[13px] text-muted">Keep this page open. It updates when the payment is confirmed.</p>
              </>
            ) : null}

            {view === "failed" ? (
              <>
                <p className="text-[15px] leading-7 text-muted">
                  {details.message || details.error || "The UPI payment was not completed."}
                </p>
                <div className="mt-6">
                  <Link href="/checkout" className="button-secondary inline-flex h-11 items-center justify-center px-5">
                    Try checkout again
                  </Link>
                </div>
              </>
            ) : null}

            {view === "missing" ? (
              <>
                <p className="text-[15px] leading-7 text-muted">Start checkout again to create a new UPI payment.</p>
                <div className="mt-6">
                  <Button href="/pricing">Go to pricing</Button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
