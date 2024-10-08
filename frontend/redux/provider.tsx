'use client';

import { store } from './store';
import { Provider } from 'react-redux';
import React from "react";

interface Props {
	children: React.ReactNode;
}

export default function CustomProvider({ children }: Props) {
	return <Provider store={store}>{children}</Provider>;
}