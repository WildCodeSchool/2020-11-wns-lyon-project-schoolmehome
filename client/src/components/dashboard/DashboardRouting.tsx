import React, { ReactElement } from 'react';
import { useAuth } from '../../context/authContext';
import SlideCreation from '../slideCreation/SlideCreation';
import { DashboardAdmin } from './dashboard-admin/DashboardAdmin';
import DashboardTeacher from './dashboard-teacher/DashboardTeacher';

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
        <div>NON</div>
      )
  }
}