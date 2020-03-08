<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Migration_Initial_migration extends CI_Migration
{
    public function up()
    {
        $this->createTableTasks();
        $this->fillTableTasks();

        $this->createTableReports();
        $this->fillTableReports();

        $this->createTableUsers();
        $this->fillTableUsers();
    }

    public function down()
    {
        $this->dropTable('tasks');
        $this->dropTable('reports');
        $this->dropTable('users');
    }

    private function createTableTasks()
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

        $this->dbforge->create_table('tasks', TRUE, ['comment' => '"Lista zadań"']);
    }

    private function fillTableTasks()
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
            [
                'name' => 'Maecenas aliquam lectus nunc',
                'description' => 'Maecenas aliquam lectus nunc, eu blandit lorem fringilla non. Nullam tempus convallis neque, quis faucibus purus rhoncus vel.'
            ],
            [
                'name' => 'Mauris porttitor, urna',
                'description' => 'Mauris porttitor, urna vel ornare rhoncus, nunc erat bibendum tortor, nec ornare nulla risus sit amet tellus.'
            ],
            [
                'name' => 'Pellentesque',
                'description' => 'Pellentesque eget purus nibh. Nullam nisi quam, sollicitudin ac commodo sed, venenatis et elit. Proin odio nisi.'
            ],
        ];

        $this->db->insert_batch('tasks', $dataToInsert);
    }

    private function createTableReports()
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

        $this->dbforge->create_table('reports', TRUE, ['comment' => '"Raporty czasu pracy"']);
    }

    private function fillTableReports()
    {
    }

    private function createTableUsers()
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

        $this->dbforge->create_table('users', TRUE, ['comment' => '"Lista użytkowników"']);
    }

    private function fillTableUsers()
    {
        $dataToInsert = [
            [
                'name' => 'Jan Kowalski',
            ],
            [
                'name' => 'Adam Nowak',
            ],
            [
                'name' => 'Anna Nieznana',
            ],
        ];

        $this->db->insert_batch('users', $dataToInsert);
    }

    private function dropTable(string $tableName = '')
    {
        $this->dbforge->drop_table($tableName, TRUE);
    }

    private function addCommonColumns()
    {
        $this->dbforge->add_field([
            'created_by INT      DEFAULT 0                 NOT NULL',
            'created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL',
            'updated_by INT      DEFAULT NULL',
            'updated_at DATETIME DEFAULT NULL',
            'deleted    INT      DEFAULT 0                 NOT NULL',
            'deleted_by INT      DEFAULT NULL',
            'deleted_at DATETIME DEFAULT NULL',
        ]);
    }
}
