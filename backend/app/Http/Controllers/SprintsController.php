<?php

namespace App\Http\Controllers;

use App\Models\Sprints;

use Illuminate\Http\Request;

class sprintsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rows = Sprints::all();
        return response()->json(['data'=>$rows], 200);  
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $newRegistro = new Sprints();
        $newRegistro->nombre = $data['nombre'];
        $newRegistro->fecha_inicio = $data['fecha_inicio'];
        $newRegistro->fecha_fin = $data['fecha_fin'];
        $newRegistro->created_at = $data['created_at'];
        $newRegistro->updated_at = $data['updated_at'];
        $newRegistro->save();
        return response()->json(['data' => 'Datos guardados', 201]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $row = Sprints::find($id);
        if (empty($row)) {
            return response()->json(['data' => 'No existe'], 404);
        }
        return response()->json(['data' => $row], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $row = Sprints::find($id);
        if (empty($row)) {
            return response()->json(['data' => 'No existe'], 404);
        }
        $data = $request->all();
        $row->nombre = $data['nombre'];
        $row->fecha_inicio = $data['fecha_inicio'];
        $row->fecha_fin = $data['fecha_fin'];
        $row->created_at = $data['created_at'];
        $row->updated_at = $data['updated_at'];
        $row->save();
        return response()->json(['data' => 'Datos guardados', 200]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $row = Sprints::find($id);
        if (empty($row)) {
            return response()->json(['data' => 'No existe'], 404);
        }
        $row->delete();
        return response()->json(['data' => 'Datos eliminados', 200]);
    }
}
