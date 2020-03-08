<?php

class Reports_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();

        $modelsToLoad = [
            'Timers_model',
            'Users_model',
        ];
        $this->load->model($modelsToLoad);
    }

    public function GetReport(array $postData = [])
    {
        $usersList = $this->Users_model->GetAllUsersList()['data'];

        $datesRange = array_key_exists('datesRange', $postData) ? $postData['datesRange'] : [date("Y-m-d")];

        $reportValues = [];

        foreach ($usersList as $user) {
            $dataset = (object) [];

            $dataset->label = $user->name;

            $userTimes = $labels = [];
            foreach ($datesRange as $date) {
                $userTimes[] = $this->Timers_model->GetUserDailyTimeReport($user->id, $date);
                $labels[] = $date;
            }
            $dataset->data = $userTimes;

            $randomString = md5($user->id);
            $r = substr($randomString, 0, 2);
            $g = substr($randomString, 2, 2);
            $b = substr($randomString, 4, 2);

            $backgroundsColors = [];
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
}
