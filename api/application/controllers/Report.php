<?php

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Report extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $modelsToLoad = [
            'Report_model',
        ];
        $this->load->model($modelsToLoad);
    }

    public function Report_post()
    {
        $postData = $this->post();
        $result = $this->Report_model->GetReport($postData);

        $this->response($result['data'], $result['status']);
    }
}
