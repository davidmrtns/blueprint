import React, { Component } from 'react';
import { Route, Router, Routes, RouterProvider, BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

import AssignmentsPage from "./paginas/atribuicao/AssignmentsPage";
import AssignmentPage from "./paginas/atribuicao/AssignmentPage";
import EditAssignmentPage from './paginas/atribuicao/EditAssignmentPage';
import NewAssignmentPage from './paginas/atribuicao/NewAssignmentPage';
import PopPage from "./paginas/pop/PopPage";
import PopsPage from "./paginas/pop/PopsPage";
import EditPopPage from './paginas/pop/EditPopPage';
import NewPopPage from './paginas/pop/NewPopPage';
import FlowPage from "./paginas/FlowPage";
import NewUserPage from "./paginas/NewUserPage";
import HomePage from "./paginas/HomePage";
import ErrorPage from "./paginas/ErrorPage";
import SelectItemPage from "./paginas/SelectItemPage";
import PrivateRoute from './paginas/PrivateRoute';
import SettingsPage from './paginas/SettingsPage';
import Organograma from './paginas/OrganogramaEstatico';
import FluxosPage from './paginas/fluxo/FluxosPage';
import FluxoPage from './paginas/fluxo/FluxoPage';

export async function loader({ params }) {
    return params;
}

export default class App extends Component {
    static displayName = App.name;

  render() {
      return (
          <Layout>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<PrivateRoute />}>
                          <Route index path="/home" element={<HomePage />} />
                          <Route path="/organograma" element={<Organograma />} />
                          <Route path="/pop/:id" loader={loader} element={<PopPage />} />
                          <Route path="/pops" element={<PopsPage />}>
                              <Route path="" element={<SelectItemPage />} />
                              <Route path="pop/:id" loader={loader} element={<PopPage />} errorElement={<ErrorPage />} />
                              <Route path="editar-pop/:id" loader={loader} element={<EditPopPage />} errorElement={<ErrorPage />} />
                              <Route path="novo-pop" element={<NewPopPage />} errorElement={<ErrorPage />} />
                          </Route>
                          <Route path="/atribuicoes" element={<AssignmentsPage />}>
                              <Route path="" element={<SelectItemPage />} />
                              <Route path="atribuicao/:id" loader={loader} element={<AssignmentPage />} errorElement={<ErrorPage />} />
                              <Route path="editar-atribuicao/:id" loader={loader} element={<EditAssignmentPage />} errorElement={<ErrorPage />} />
                              <Route path="nova-atribuicao" element={<NewAssignmentPage />} errorElement={<ErrorPage />} />
                          </Route>
                          <Route path="/configuracoes" element={<SettingsPage />} />
                          <Route path="/novo-usuario" element={<NewUserPage />} />
                          <Route path="/fluxos" element={<FluxosPage />}>
                              <Route path="" element={<SelectItemPage />} />
                              <Route path="flow-antigo" element={<FlowPage />} />
                              <Route path="flow" loader={loader} element={<FluxoPage />} errorElement={<FluxoPage />} />
                          </Route>
                      </Route>
                  </Routes>
              </BrowserRouter>
          </Layout>
      );
  }
}

//<Route path="/novo-usuario" element={<NewUserPage />} />
//<Route path="editar-pop/:id" loader={loader} element={<EditPopPage />} errorElement={<ErrorPage />} />
//<Route path="editar-atribuicao/:id" loader={loader} element={<EditAssignmentPage />} errorElement={<ErrorPage />} />
//<Route path="/fluxos" element={<FlowPage />} />