<?php

class User_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function GetUsersList()
    {
        $dataToSelect = [
            'id',
            'name',
        ];

        $list = $this->db
            ->select($dataToSelect)
            ->get('user')
            ->result();

        return ['data' => $list, 'status' => count($list) > 0 ? HTTP_RESPONSE__SUCCESS : HTTP_RESPONSE__NOT_FOUND];
    }
}
