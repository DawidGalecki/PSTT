<?php

class Report_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function GetReport(array $postData = [])
    {
        $usersList = $this->GetUsersList();

        $datesRange = array_key_exists('datesRange', $postData) ? $postData['datesRange'] : [date("Y-m-d")];

        $reportValues = [];

        foreach ($usersList as $user) {
            $dataset = (object) [];

            $dataset->label = $user->name;

            $userTimes = $labels = [];

            foreach ($datesRange as $date) {
                $userTimes[] = $this->GetUserDailyTimeReport($user->id, $date);
                $labels[] = $date;
            }

            $dataset->data = $userTimes;

            $backgroundsColors = [];

            $randomString = md5($user->id);
            $r = substr($randomString, 0, 2);
            $g = substr($randomString, 2, 2);
            $b = substr($randomString, 4, 2);

            for ($i = 0; $i < count($userTimes); $i++) {
                $a = '66';
                $backgroundsColors[] = "#$r$g$b$a";
            }

            $dataset->backgroundColor = $backgroundsColors;

            $dataset->borderWidth = 2;

            $bordersColors = [];

            for ($i = 0; $i < count($userTimes); $i++) {
                $a = 'FF';
                $bordersColors[] = "#$r$g$b$a";
            }

            $dataset->borderColor = $bordersColors;

            $reportValues['datasets'][] = $dataset;
            $reportValues['labels'] = $labels;
        }

        return ['data' => $reportValues, 'status' => count($reportValues) > 0 ? HTTP_RESPONSE__SUCCESS : HTTP_RESPONSE__NOT_FOUND];
    }

    private function GetUsersList()
    {
        $dataToSelect = [
            'id',
            'name',
        ];

        return $this->db
            ->select($dataToSelect)
            ->get('user')
            ->result();
    }

    private function GetUserDailyTimeReport(int $userId = 0, string $date = '2020-01-01')
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

        $list = $this->db
            ->select($dataToSelect)
            ->where($whereConditions)
            ->order_by('id', 'DESC')
            ->get('report')
            ->result();

        $duration = 0;

        foreach ($list as $row) {
            $duration += strtotime($row->finished_at) - strtotime($row->started_at);
        }

        return round(($duration) / 3600, 2);
    }
}
