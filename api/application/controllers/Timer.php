<?php

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Timer extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $modelsToLoad = [
            'Timer_model',
        ];
        $this->load->model($modelsToLoad);
    }

    public function Start_post()
    {
        $postData = $this->post();
        $result = $this->Timer_model->StartTimer($postData);

        $this->response($result['data'], $result['status']);
    }

    public function Stop_post()
    {
        $postData = $this->post();
        $result = $this->Timer_model->StopTimer($postData);

        $this->response($result['data'], $result['status']);
    }
}
