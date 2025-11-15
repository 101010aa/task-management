<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        Task::create([
            'title' => 'Complete Laravel API',
            'description' => 'Build REST API for task management',
            'status' => 'completed',
            'due_date' => now()->addDays(2)
        ]);

        Task::create([
            'title' => 'Create React Frontend',
            'description' => 'Build React components for task management',
            'status' => 'in-progress',
            'due_date' => now()->addDays(5)
        ]);

        Task::create([
            'title' => 'Testing and Documentation',
            'description' => 'Test the application and write documentation',
            'status' => 'pending',
            'due_date' => now()->addDays(7)
        ]);
    }
}