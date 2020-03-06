<?php

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Task extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $modelsToLoad = [
            'Task_model',
        ];
        $this->load->model($modelsToLoad);
    }

    public function List_get()
    {
        $result = $this->Task_model->GetTasksList();

        $this->response($result['data'], $result['status']);
    }
}
