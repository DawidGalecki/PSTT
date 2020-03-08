<?php

class Timers_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();

        $modelsToLoad = [
            'Tasks_model',
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
            ->insert('reports', $dataToInsert);

        return ['data' => ['timerId' => $this->db->insert_id(), 'taskId' => $postData['taskId'], 'taskName' => $this->Tasks_model->GetTask($postData['taskId'])['data']->name], 'status' => $this->db->affected_rows() > 0 ? HTTP_RESPONSE__SUCCESS : HTTP_RESPONSE__NOT_FOUND];
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
            ->update('reports', $dataToUpdate);

        return ['data' => ['timerId' => null, 'taskId' => null, 'taskName' => ''], 'status' => $this->db->affected_rows() > 0 ? HTTP_RESPONSE__SUCCESS : HTTP_RESPONSE__NOT_FOUND];
    }

    public function GetUserDailyTimeReport(int $userId = 0, ?string $date = '2020-01-01')
    {
        $dataToSelect = [
            'id',
            'started_at',
            'finished_at',
        ];

        $whereConditions = [
            'user_id' => $userId,
            'started_at >= ' => $date . ' 00:00:00',
            'finished_at <= ' => $date . ' 23:59:59',
        ];

        $result = $this->db
            ->select($dataToSelect)
            ->where($whereConditions)
            ->order_by('id', 'DESC')
            ->get('reports')
            ->result();

        $duration = 0;

        foreach ($result as $res) {
            $duration += strtotime($res->finished_at) - strtotime($res->started_at);
        }

        return round(($duration) / 3600, 2);
    }
}
