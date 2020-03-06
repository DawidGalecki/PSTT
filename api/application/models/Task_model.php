<?php

class Task_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function GetTasksList()
    {
        $dataToSelect = [
            'id',
            'name',
            'description',
        ];

        $list = $this->db
            ->select($dataToSelect)
            ->get('task')
            ->result();

        return ['data' => $list, 'status' => count($list) > 0 ? HTTP_RESPONSE__SUCCESS : HTTP_RESPONSE__NOT_FOUND];
    }
}
