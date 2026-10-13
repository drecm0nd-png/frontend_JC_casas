// src/routes/AppRoutes.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/registro" element={<Registro />} />
  <Route
    path="/perfil"
    element={
      <ProtectedRoute>
        <Perfil />
      </ProtectedRoute>
    }
  />
</Routes>;
