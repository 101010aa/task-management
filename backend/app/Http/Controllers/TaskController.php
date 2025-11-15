<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        Log::info('INDEX METHOD CALLED');
        $tasks = Task::orderBy('created_at', 'desc')->get();
        return response()->json($tasks);
    }

    public function store(Request $request): JsonResponse
    {
        Log::info('STORE METHOD CALLED', $request->all());
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in-progress,completed',
            'due_date' => 'required|date'
        ]);

        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function show($id): JsonResponse
    {
        Log::info('SHOW METHOD CALLED', ['id' => $id]);
        $task = Task::find($id);
        if (!$task) {
            Log::warning('Task not found', ['id' => $id]);
            return response()->json(['error' => 'Task not found'], 404);
        }
        return response()->json($task);
    }

    public function update(Request $request, $id): JsonResponse
    {
        Log::info('UPDATE METHOD CALLED', ['id' => $id, 'data' => $request->all()]);
        
        $task = Task::find($id);
        if (!$task) {
            Log::warning('Task not found for update', ['id' => $id]);
            return response()->json(['error' => 'Task not found'], 404);
        }
        
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:pending,in-progress,completed',
            'due_date' => 'sometimes|required|date'
        ]);

        $task->update($validated);
        Log::info('Task updated successfully', ['id' => $id]);
        return response()->json($task);
    }

    public function destroy($id): JsonResponse
    {
        Log::info('DESTROY METHOD CALLED', ['id' => $id]);
        
        $task = Task::find($id);
        if (!$task) {
            Log::warning('Task not found for delete', ['id' => $id]);
            return response()->json(['error' => 'Task not found'], 404);
        }
        
        $task->delete();
        Log::info('Task deleted successfully', ['id' => $id]);
        return response()->json(null, 204);
    }
}