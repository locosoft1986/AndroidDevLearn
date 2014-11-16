<?php
return array(
    'di' => array(
        'services' => array(
            'Customer\Model\CustomerTable' => 'Customer\Model\CustomerTable'
        )
    ),
    'controllers' => array(
        'invokables' => array(
            'Customer\Controller\Index' => 'Customer\Controller\IndexController',
        ),
    ),
    'router' => array(
        'routes' => array(
            'customer' => array(
                'type'    => 'Zend\Mvc\Router\Http\Segment',
                'options' => array(
                    // Change this to something specific to your module
                    'route'    => '/api/customer[/:id]',
                    'constraints'=>array(
                        'id'=>'\w+'                       
                    ),
                    'defaults' => array(
                        // Change this value to reflect the namespace in which
                        // the controllers for your module are found
                        //'__NAMESPACE__' => 'Customer\Controller',
                        'controller'    => 'Customer\Controller\Index',
                        //'action'        => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    // This route is a sane default when developing a module;
                    // as you solidify the routes for your module, however,
                    // you may want to remove it and replace it with more
                    // specific routes.
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/[:controller[/:action]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                            ),
                        ),
                    ),
                ),
            ),
        ),
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            'Customer' => __DIR__ . '/../view',
        ),
    ),
);
