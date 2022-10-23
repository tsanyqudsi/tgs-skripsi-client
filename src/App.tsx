
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as React from 'react';
import {Table} from 'evergreen-ui';
import useAxios from 'axios-hooks';
import {url} from './constants';

const App = () => {
	const [count, setCount] = React.useState(0);
	const [response, refetch] = useAxios(url);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setCount(x => x + 1);
			void refetch();
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [count]);

	if (response.data) {
		return (
			<div className='App'>
				<Table>
					<Table.Head>
						<Table.TextHeaderCell>Mata Uang</Table.TextHeaderCell>
						<Table.TextHeaderCell>Nilai Jual</Table.TextHeaderCell>
						<Table.TextHeaderCell>Nilai Beli</Table.TextHeaderCell>
					</Table.Head>
					<Table.Body>
						{response.data.data.map((value: {id: React.Key | undefined | undefined; mataUang: string | number | boolean | React.ReactElement | React.ReactFragment | React.ReactPortal | undefined | undefined; nilaiJual: string | number | boolean | React.ReactElement | React.ReactFragment | React.ReactPortal | undefined | undefined; nilaiBeli: string | number | boolean | React.ReactElement | React.ReactFragment | React.ReactPortal | undefined | undefined}) => (
							<Table.Row key={value.id}>
								<Table.TextCell>{value.mataUang}</Table.TextCell>
								<Table.TextCell>{value.nilaiJualAwal}</Table.TextCell>
								<Table.TextCell isNumber>{value.nilaiBeliAwal}</Table.TextCell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
				<div>{count}</div>
			</div>
		);
	}

	if (response.error) {
		return <div>error</div>;
	}

	if (response.loading) {
		return <div>loading</div>;
	}
};

export default App;
