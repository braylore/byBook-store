import Layout from 'components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { appRoutes } from 'routes';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        {appRoutes.map(({ element, path }) =>
          path === '/' ? (
            <Route
              index
              element={element}
              key={path}
            />
          ) : (
            <Route
              element={element}
              path={path}
              key={path}
            />
          )
        )}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
