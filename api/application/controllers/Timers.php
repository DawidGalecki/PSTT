<?php

defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Timers extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $modelsToLoad = [
            'Timers_model',
        ];
        $this->load->model($modelsToLoad);
    }

    public function Start_post()
    {
        $postData = $this->post();
        $result = $this->Timers_model->StartTimer($postData);

        $this->response($result['data'], $result['status']);
    }

    public function Stop_post()
    {
        $postData = $this->post();
        $result = $this->Timers_model->StopTimer($postData);

        $this->response($result['data'], $result['status']);
    }
}
