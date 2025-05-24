<?php

namespace App\Http\Controllers;

use App\Models\Registro;

use Illuminate\Http\Request;

class RegistroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rows = Registro::all();
        return response()->json(['data'=>$rows], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $newRegistro = new Registro();
        $newRegistro->sprint_id = $data['sprint_id'];
        $newRegistro->categoria = $data['categoria'];
        $newRegistro->descripcion = $data['descripcion'];
        $newRegistro->cumplida = $data['cumplida'];
        $newRegistro->fecha_revision = $data['fecha_revision'];
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
        $row = Registro::find($id);
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
        $row = Registro::find($id);
        if (empty($row)) {
            return response()->json(['data' => 'No existe'], 404);
        }
        $data = $request->all();
        $row->sprint_id = $data['sprint_id'];
        $row->categoria = $data['categoria'];
        $row->descripcion = $data['descripcion'];
        $row->cumplida = $data['cumplida'];
        $row->fecha_revision = $data['fecha_revision'];
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
        $row = Registro::find($id);
        if (empty($row)) {
            return response()->json(['data' => 'No existe'], 404);
        }
        $row->delete();
        return response()->json(['data' => 'Datos eliminados', 200]);
    }
}
