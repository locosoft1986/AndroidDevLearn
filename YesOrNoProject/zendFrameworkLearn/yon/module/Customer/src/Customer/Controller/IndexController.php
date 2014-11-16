<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/Customer for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Customer\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;

class IndexController extends AbstractActionController
{
    protected  $customerTable;
    
    protected function getCustomerTable()
    {
        if(!$this->customerTable)
        {
            $sm = $this->getServiceLocator();
            $this->customerTable = $sm->get('Customer\Model\CustomerTable');
        }
        return $this->customerTable;
    }
    
    public function get($username)
    {
        $customerTable = $this->getCustomerTable();
        $customerData = $customerTable->getByUsername($username);
        
        if ($customerData !== false) 
        {
            return new JsonModel($customerData->getArrayCopy());
        }
        else 
        {
            throw new \Exception('User not found', 404);
        }
    }
    
    public function indexAction()
    {
        return array();
    }

    public function fooAction()
    {
        // This shows the :controller and :action parameters in default route
        // are working when you browse to /index/index/foo
        return array();
    }
    
    public function getList()
    {
        $this->methodNotAllowed();
    }
    public function create($data)
    {
        $this->methodNotAllowed();
    }
    public function update($id, $data)
    {
        $this->methodNotAllowed();
    }
    public function delete($id)
    {
        $this->methodNotAllowed();
    }
    protected function methodNotAllowed()
    {
        $this->response->setStatusCode(
            \Zend\Http\PhpEnvironment\Response::STATUS_CODE_405
        );
    }
}
