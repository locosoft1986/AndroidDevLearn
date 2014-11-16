<?php
/**
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace ZendDiagnostics\Check;

use InvalidArgumentException;
use ZendDiagnostics\Result\Failure;
use ZendDiagnostics\Result\Skip;
use ZendDiagnostics\Result\Success;
use ZendDiagnostics\Result\Warning;

/**
 * Checks to see if the APC memory usage is below warning/critical thresholds
 *
 * APC memory logic borrowed from APC project:
 *      https://github.com/php/pecl-caching-apc/blob/master/apc.php
 *      authors:   Ralf Becker <beckerr@php.net>, Rasmus Lerdorf <rasmus@php.net>, Ilia Alshanetsky <ilia@prohost.org>
 *      license:   The PHP License, version 3.01
 *      copyright: Copyright (c) 2006-2011 The PHP Group
 */
class ApcMemory extends AbstractCheck implements CheckInterface
{
    /**
     * Percentage that will cause a warning.
     *
     * @var int
     */
    protected $warningThreshold;

    /**
     * Percentage that will cause a fail.
     *
     * @var int
     */
    protected $criticalThreshold;

    /**
     * @param int $warningThreshold  A number between 0 and 100
     * @param int $criticalThreshold A number between 0 and 100
     * @throws InvalidArgumentException
     */
    public function __construct($warningThreshold, $criticalThreshold)
    {
        if (!is_numeric($warningThreshold)) {
            throw new InvalidArgumentException('Invalid warningThreshold argument - expecting an integer');
        }

        if (!is_numeric($criticalThreshold)) {
            throw new InvalidArgumentException('Invalid criticalThreshold argument - expecting an integer');
        }

        if ($warningThreshold > 100 || $warningThreshold < 0) {
            throw new InvalidArgumentException('Invalid warningThreshold argument - expecting an integer between 1 and 100');
        }

        if ($criticalThreshold > 100 || $criticalThreshold < 0) {
            throw new InvalidArgumentException('Invalid criticalThreshold argument - expecting an integer between 1 and 100');
        }

        $this->warningThreshold  = (int)$warningThreshold;
        $this->criticalThreshold = (int)$criticalThreshold;
    }

    /**
     * Perform the check
     *
     * @see \ZendDiagnostics\Check\CheckInterface::check()     *
     * @return Failure|Skip|Success|Warning
     */
    public function check()
    {
        if (!function_exists('apc_sma_info')) {
            return new Warning('APC extension is not available');
        }

        if (!$info = apc_sma_info()) {
            return new Warning('Unable to retrieve APC memory status information.');
        }

        $size        = $info['num_seg'] * $info['seg_size'];
        $available   = $info['avail_mem'];
        $used        = $size - $available;
        $percentUsed = ($used / $size) * 100;
        $message     = sprintf('%.0f%% of available %s memory used.', $percentUsed, $this->formatBytes($size));

        if ($percentUsed > $this->criticalThreshold) {
            return new Failure($message);
        }

        if ($percentUsed > $this->warningThreshold) {
            return new Warning($message);
        }

        return new Success($message);
    }

    /**
     * @param int $bytes
     * @return string
     */
    private function formatBytes($bytes)
    {
        $size = 'B';

        foreach (array('B','KB','MB','GB') as $size) {
            if ($bytes < 1024) {
                break;
            }

            $bytes /= 1024;
        }

        return sprintf("%.0f %s", $bytes, $size);
    }
}
