import React, { FC } from 'react';
import ClientForm from "./insert-form";
import MainLayout from "../../layout/main-layout";

const InsertClient: FC = () => {
  return (
    <>
      <div>
        <ClientForm />
      </div>
    </>
  );
};

export default MainLayout(InsertClient);
