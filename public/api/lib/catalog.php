<?php
/**
 * Credit rules used by the ledger. Keep in step with src/data/credits.ts.
 */
if (!defined('FD_API')) {
    http_response_code(404);
    exit;
}

function fdCatalog()
{
    static $catalog = null;
    if ($catalog !== null) {
        return $catalog;
    }
    $catalog = array(
        'credits' => array(
            'prefix' => 'MODX',
            'min' => 10,
            'max' => 9899,
            'step' => 1,
            'validityDays' => 90,
            'topupBonus' => array(
                array('min' => 500, 'percent' => 3),
                array('min' => 2000, 'percent' => 5),
                array('min' => 5000, 'percent' => 8),
            ),
            'topupBonusCap' => 500,
        ),
        'creditBonus' => array(
            'enabled' => false,
            'percent' => 0,
            'cap' => 0,
        ),
    );
    return $catalog;
}
