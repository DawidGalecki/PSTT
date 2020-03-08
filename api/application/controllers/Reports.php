<?php

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Reports extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $modelsToLoad = [
            'Reports_model',
        ];
        $this->load->model($modelsToLoad);
    }

    public function Get_post()
    {
        $postData = $this->post();
        $result = $this->Reports_model->GetReport($postData);

        $this->response($result['data'], $result['status']);
    }
}
