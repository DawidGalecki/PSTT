<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Migration_Initial_migration extends CI_Migration
{
    public function up()
    {
        $this->createTableTask();
        $this->fillTableTask();

        $this->createTableReport();
        $this->fillTableReport();

        $this->createTableUser();
        $this->fillTableUser();
    }

    public function down()
    {
        $this->dropTable('task');
        $this->dropTable('report');
        $this->dropTable('user');
    }

    private function createTableTask()
    {
        $this->dbforge->add_field([
            'id' => [
                'auto_increment' => TRUE,
                'type' => 'INT',
            ],
            'name' => [
                'constraint' => 100,
                'type' => 'VARCHAR',
            ],
            'description' => [
                'constraint' => 1000,
                'type' => 'VARCHAR',
            ],
        ]);

        $this->addCommonColumns();

        $this->dbforge->add_key('id', TRUE);

        $this->dbforge->create_table('task', TRUE, ['comment' => '"Lista zadań"']);
    }

    private function fillTableTask()
    {
        $dataToInsert = [
            [
                'name' => 'Lorem Ipsum',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel gravida justo. Quisque ac nibh libero.'
            ],
            [
                'name' => 'Aliquam id venenatis tortor',
                'description' => 'Aliquam id venenatis tortor. Donec at sem at mi condimentum laoreet. Ut sit amet nulla quis sem imperdiet vulputate.'
            ],
        ];

        $this->db->insert_batch('task', $dataToInsert);
    }

    private function createTableReport()
    {
        $this->dbforge->add_field([
            'id' => [
                'auto_increment' => TRUE,
                'type' => 'INT',
            ],
            'user_id' => [
                'type' => 'INT',
            ],
            'task_id' => [
                'type' => 'INT',
            ],
            'started_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL',
            'finished_at DATETIME',
        ]);

        $this->addCommonColumns();

        $this->dbforge->add_key('id', TRUE);

        $this->dbforge->create_table('report', TRUE, ['comment' => '"Raport czasu pracy"']);
    }

    private function fillTableReport()
    {
    }

    private function createTableUser()
    {
        $this->dbforge->add_field([
            'id' => [
                'auto_increment' => TRUE,
                'type' => 'INT',
            ],
            'name' => [
                'constraint' => 100,
                'type' => 'VARCHAR',
            ],
        ]);

        $this->addCommonColumns();

        $this->dbforge->add_key('id', TRUE);

        $this->dbforge->create_table('user', TRUE, ['comment' => '"Lista użytkowników"']);
    }

    private function fillTableUser()
    {
        $dataToInsert = [
            [
                'name' => 'Jan Kowalski',
            ],
            [
                'name' => 'Adam Nowak',
            ],
        ];

        $this->db->insert_batch('user', $dataToInsert);
    }

    private function dropTable(string $tableName = '')
    {
        $this->dbforge->drop_table($tableName, TRUE);
    }

    private function addCommonColumns()
    {
        $this->dbforge->add_field([
            'created_by INT         DEFAULT 0                   NOT NULL',
            'created_at DATETIME    DEFAULT CURRENT_TIMESTAMP   NOT NULL',
            'updated_by INT         DEFAULT NULL',
            'updated_at DATETIME    DEFAULT NULL',
            'deleted    INT         DEFAULT 0                   NOT NULL',
            'deleted_by INT         DEFAULT NULL',
            'deleted_at DATETIME    DEFAULT NULL',
        ]);
    }
}
