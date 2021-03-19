import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TransferPage from './pages/TransferPage';
import AccountPage from './pages/AccountPage';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

export default function App() {
	return (
		<Router>
			<Header />
			<Container>
				<Switch>
					<Route exact path="/">
						<TransferPage />
					</Route>
					<Route path="/account">
						<AccountPage />
					</Route>
				</Switch>
			</Container>
			<Footer />
		</Router>
	);
}
