<?php

namespace ZendDiagnosticsTest;

use ZendDiagnostics\Check\ApcFragmentation;

/**
 * @author Kevin Bond <kevinbond@gmail.com>
 */
class ApcFragmentationTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @dataProvider InvalidArgumentProvider
     */
    public function testInvalidArguments($warningThreshold, $criticalThreshold)
    {
        $this->setExpectedException('InvalidArgumentException');
        new ApcFragmentation($warningThreshold, $criticalThreshold);
    }

    public function InvalidArgumentProvider()
    {
        return array(
            array('Not an integer.', 'Not an integer.'),
            array(5, 'Not an integer.'),
            array('Not an integer.', 100),
            array(-10, 100),
            array(105, 100),
            array(10, -10),
            array(10, 105)
        );
    }
}
