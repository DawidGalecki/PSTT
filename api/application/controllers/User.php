<?php

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class User extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $modelsToLoad = [
            'User_model',
        ];
        $this->load->model($modelsToLoad);
    }

    public function List_get()
    {
        $result = $this->User_model->GetUsersList();

        $this->response($result['data'], $result['status']);
    }
}
