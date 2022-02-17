import { useMutation } from '@apollo/client';
import { GET_SPACE_BY_MEMBER_ID_MUTATION } from 'apis/spaces/mutations';
import LoadingView from 'components/shared/loadingView/loadingView';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { SPACE_DEFAULT } from 'slices/employeeDuties/initialState';
import { IPropsDefaultValue } from 'slices/employeeDuties/interfaces';
import { ISpace } from 'slices/space/interfaces';
import { mainParamPage } from 'global/routes/page';

interface IProps {
	defaultValue: IPropsDefaultValue;
	onChangeData: (e: any) => void;
}

const ListFilterSpaceProjectListDD: React.FC<IProps> = ({ defaultValue, onChangeData }) => {
	const params = useParams();
	const [ options, setOptions ] = useState([ defaultValue ]);

	const [ onGetSpacesByMemberId, { loading: loadingGetSpacesByMemberId } ] = useMutation(
		GET_SPACE_BY_MEMBER_ID_MUTATION,
	);

	useEffect(() => {
		const fetchData = async () => {
			if (!loadingGetSpacesByMemberId) {
				const { data, isError } = await fetchDataAndShowNotify({
					fnFetchData: onGetSpacesByMemberId,
					variables: { findByMemberId: { _memberId: params[mainParamPage.userId] } },
				});

				if (!isError) {
					const newOptions = [ SPACE_DEFAULT ];

					newOptions.push(
						...data.map((d: ISpace) => ({
							label: d.name,
							value: d._id,
						})),
					);
					setOptions(newOptions);
				}
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loadingGetSpacesByMemberId) return <LoadingView />;

	return (
		<Select
			defaultValue={defaultValue}
			onChange={onChangeData}
			options={options}
			styles={{
				control:
					() => ({
						width: 200,
					}),
			}}
			components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
		/>
	);
};

export default ListFilterSpaceProjectListDD;
