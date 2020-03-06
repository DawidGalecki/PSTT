<?php

class Timer_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();

        $modelsToLoad = [
            'Task_model',
        ];
        $this->load->model($modelsToLoad);
    }

    public function StartTimer(array $postData = [])
    {
        $dataToInsert = [
            'user_id' => $postData['userId'],
            'task_id' => $postData['taskId'],
        ];

        $this->db
            ->insert('report', $dataToInsert);

        return ['data' => ['timerId' => $this->db->insert_id(), 'taskId' => $postData['taskId'], 'taskName' => $this->Task_model->GetTask($postData['taskId'])['data']->name], 'status' => $this->db->affected_rows() > 0 ? HTTP_RESPONSE__SUCCESS : HTTP_RESPONSE__NOT_FOUND];
    }

    public function StopTimer(array $postData = [])
    {
        $whereConditions = [
            'id' => $postData['startedTimerId'],
        ];

        $now = date("Y-m-d H:i:s");

        $dataToUpdate = [
            'finished_at' => $now,
            'updated_by' => 0,
            'updated_at' => $now,
        ];

        $this->db
            ->where($whereConditions)
            ->update('report', $dataToUpdate);

        return ['data' => ['timerId' => null, 'taskId' => null, 'taskName' => ''], 'status' => $this->db->affected_rows() > 0 ? HTTP_RESPONSE__SUCCESS : HTTP_RESPONSE__NOT_FOUND];
    }
}
