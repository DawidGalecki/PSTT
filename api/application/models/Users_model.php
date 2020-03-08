<?php

class Users_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function GetAllUsersList()
    {
        $dataToSelect = [
            'id',
            'name',
        ];

        $result = $this->db
            ->select($dataToSelect)
            ->get('users')
            ->result();

        return ['data' => $result, 'status' => count($result) > 0 ? HTTP_RESPONSE__SUCCESS : HTTP_RESPONSE__NOT_FOUND];
    }

    public function GetUserDetails(int $userId = 0)
    {
        $dataToSelect = [
            'id',
            'name',
        ];

        $whereConditions = [
            'id' => $userId,
        ];

        $row = $this->db
            ->select($dataToSelect)
            ->where($whereConditions)
            ->get('users')
            ->row();

        return ['data' => $row, 'status' => $row !== null ? HTTP_RESPONSE__SUCCESS : HTTP_RESPONSE__NOT_FOUND];
    }
}
