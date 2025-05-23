import { NextResponse } from "next/server"
import { createClient } from "../../../../utils/supabase/client"

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// }



// Función para leer usuarios del archivo JSON




export async function GET() {
  try {

    const supabase = createClient()
    const { data, error } = await supabase.from("users").select("*")

    if (error) {
      console.error("Error fetching users:", error)
      return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
    }
    // Filtrar información sensible como contraseñas
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const safeUsers = data.map(({ password, ...user }) => user)

    return NextResponse.json(safeUsers)
  } catch (error) {
    console.error("Error getting users:", error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}


// // Validaciones básicas
// if (!name || !email || !role) {
//   return NextResponse.json({ message: "Nombre, email y rol son requeridos" }, { status: 400 })
// }

// const users = getUsers()

// // Verificar si el email ya existe
// const existingUser = users.find((user: User) => user.email === email)
// if (existingUser) {
//   return NextResponse.json({ message: "El email ya está registrado" }, { status: 400 })
// }
// POST - Crear un nuevo usuario

// const res = await supabase.auth.admin.createUser({
//   email,
//   password,
export async function POST(request: Request) {
  try {

    console.log(request);
    const { name, email, role, password = "123" } = await request.json()

    // Validaciones básicas
    if (!name || !email || !role) {
      return NextResponse.json(
        { message: "Faltan campos requeridos: name, email, role" },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const data = {
      name: name,
      email: email,
      role: role,
      password: password,
    };

    try {
      const response = await supabase.from('users').insert(data);
      console.log('Datos insertados:', response);
    } catch (error) {
      console.error('Error al insertar datos:', error);
    }


    // // Crear nuevo usuario

    // const { data, error } = await supabase
    //   .from("users")
    //   .insert({
    //     name,
    //     email,
    //     password,
    //     role
    //   })
    //   .select() // Importante: agregar select() para obtener los datos insertados

    // // Verificar si hay error
    // if (error) {
    //   console.error("Error de Supabase:", error)
    //   return NextResponse.json(
    //     { message: "Error al crear usuario", error: error.message },
    //     { status: 400 }
    //   )
    // }

    // Respuesta exitosa
    return NextResponse.json(
      { message: "Usuario creado exitosamente", data },
      { status: 201 }
    )

  } catch (error) {
    console.error("Error creating user:", error)
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error interno del servidor", error: error.message },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

