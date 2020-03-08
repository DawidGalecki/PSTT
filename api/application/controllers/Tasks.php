<?php

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Tasks extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $modelsToLoad = [
            'Tasks_model',
        ];
        $this->load->model($modelsToLoad);
    }

    public function All_get()
    {
        $result = $this->Tasks_model->GetAllTasksList();

        $this->response($result['data'], $result['status']);
    }
}
