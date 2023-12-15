import React from "react";
import PropTypes from "prop-types";
import { List, Card, Button } from "antd";
import { StopOutlined } from "@ant-design/icons";

const FollowList = ({ header, data }) => {
	return (
		<List
			style={{ marginBotton: 20 }}
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
			renderItem={(item) => (
				<List.Item style={{ marginTop: 20 }}>
					<Card actions={[<StopOutlined key="stop" />]}>
						<Card.Meta description={item.nickname} />
					</Card>
				</List.Item>
			)}
		/>
	);
};

FollowList.propsTypes = {
	header: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
};

export default FollowList;
