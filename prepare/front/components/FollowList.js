import React from "react";
import PropTypes from "prop-types";
import { List, Card, Button } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../reducers/user";

const FollowList = ({ header, data }) => {
	const dispatch = useDispatch();
	const onClick = (id) => () => {
		if (header === 'following') {
			dispatch({
				type: UNFOLLOW_REQUEST,
				data: id,
			});
		}
		if (header === 'follower') {
			dispatch({
				type: REMOVE_FOLLOWER_REQUEST,
				data: id,
			});
		}

	};

	return (
		<List
			style={{ marginBottom: 20 }}
			grid={{ gutter: 4, xs: 2, md: 3 }}
			size="small"
			header={<div>{header}</div>}
			loadMore={
				<div style={{ textAlign: "center", margin: "10px 0" }}>
					<Button>more</Button>
				</div>
			}
			bordered
			dataSource={data}
			renderItem={(item) => {
				console.log("Data:", data);
				console.log("Item:", item);
				return (
					<List.Item style={{ marginTop: 20 }}>
						<Card actions={[<StopOutlined key="stop" onClick={onClick(item.id)}/>]}>
							<Card.Meta description={item.nickname} />
						</Card>
					</List.Item>
				);
			}}

		/>
	);
};

FollowList.propTypes = {
	header: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
};

export default FollowList;
