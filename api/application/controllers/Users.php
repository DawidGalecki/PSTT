<?php

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Users extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $modelsToLoad = [
            'Users_model',
        ];
        $this->load->model($modelsToLoad);
    }

    public function All_get()
    {
        $result = $this->Users_model->GetAllUsersList();

        $this->response($result['data'], $result['status']);
    }

    public function User_get(int $userId = 0)
    {
        $result = $this->Users_model->GetUserDetails($userId);

        $this->response($result['data'], $result['status']);
    }
}
