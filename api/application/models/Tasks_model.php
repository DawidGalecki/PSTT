<?php

class Tasks_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function GetAllTasksList()
    {
        $dataToSelect = [
            'id',
            'name',
            'description',
        ];

        $result = $this->db
            ->select($dataToSelect)
            ->get('tasks')
            ->result();

        return ['data' => $result, 'status' => count($result) > 0 ? HTTP_RESPONSE__SUCCESS : HTTP_RESPONSE__NOT_FOUND];
    }

    public function GetTask(int $taskId = 0)
    {
        $dataToSelect = [
            'id',
            'name',
        ];

        $whereConditions = [
            'id' => $taskId,
        ];

        $row = $this->db
            ->select($dataToSelect)
            ->where($whereConditions)
            ->get('tasks')
            ->row();

        return ['data' => $row, 'status' => $row !== null ? HTTP_RESPONSE__SUCCESS : HTTP_RESPONSE__NOT_FOUND];
    }
}
