<?php

/**
 * CustomerTable
 *  
 * @author Locosoft
 * @version 
 */
namespace Customer\Model;	

use Zend\Db\Adapter\Adapter;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Adapter\AdapterAwareInterface;

class CustomerTable extends AbstractTableGateway implements AdapterAwareInterface
{
	/**
	 * The default table name 
	 */
    protected $_name = 'customer';
    
    public function setDbAdapter(Adapter $adapter)
    {
        $this->adapter = $adapter;
        $this->initialize();
    }
    
    
    public function getByUsername($username)
    {
        $rowset = $this->select(array('username' => $username));
        
        return $rowset->current();
    }
}
