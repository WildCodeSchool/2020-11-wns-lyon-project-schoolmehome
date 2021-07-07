import React, { ReactElement, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { DashboardAdmin } from './dashboard-admin/DashboardAdmin';
import DashboardTeacher from './dashboard-teacher/DashboardTeacher';
import { DashboardUser } from './dashboard-user/DashboardUser';

export const DashboardRouting = (): ReactElement => {
  const { user } = useAuth();

  switch (user.role) {
    case 'Admin':
      return (
        <DashboardAdmin />
      )
    case 'Teacher':
      return (
        <DashboardTeacher />
      )
    default:
      return (
        <DashboardUser />
      )
  }
}