import React, { Component } from 'react';
import getRecipientItemsAPI from '../API/getRecipientItems';
import { Card, Avatar, Modal, Button } from 'antd';
const { Meta } = Card;
// const recieveItemAPI = require('../API/recieveItem');

/**
 * React component for receiving component
 * @extends React.Component
 */
class MarketPlace extends Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
	constructor(props) {
		super(props);
		this.state = {
			recipientItems: [],
			history: 'All',
			isModalOpen: false,
			showAlert: false,
		};
	}

	/**
	 * Call getRecipientItemsAPI and store results in state
	 */
	loadData = async () => {
		let res = await getRecipientItemsAPI(this.props.props.userId);

		console.log('market place', res);
		// let recipientItems = [{
		// 	itemId: 1,
		// 	itemName: 'rice1',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food',
		// 	donorEmail: 'abc@gmail.com'
		// },
		// {
		// 	itemId: 2,
		// 	itemName: 'rice2',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food'
		// },
		// {
		// 	itemId: 3,
		// 	itemName: 'rice3',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food'
		// },
		// {
		// 	itemId: 4,
		// 	itemName: 'rice4',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food'
		// },
		// {
		// 	itemId: 5,
		// 	itemName: 'rice5',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food'
		// },
		// {
		// 	itemId: 6,
		// 	itemName: 'rice6',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food'
		// },
		// {
		// 	itemId: 7,
		// 	itemName: 'rice7',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food'
		// },
		// {
		// 	itemId: 8,
		// 	itemName: 'rice8',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food'
		// },
		// {
		// 	itemId: 9,
		// 	itemName: 'rice9',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food'
		// },
		// {
		// 	itemId: 10,
		// 	itemName: 'rice10',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food'
		// },
		// {
		// 	itemId: 11,
		// 	itemName: 'rice11',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food'
		// },
		// {
		// 	itemId: 12,
		// 	itemName: 'rice12',
		// 	itemQuantity: 1,
		// 	itemDescription: 'left over rice',
		// 	itemZipCode: '27606',
		// 	itemCity: 'raleigh',
		// 	itemDonorId: '1',
		// 	itemCategory: 'food'
		// }
		// ];
		this.setState({
			recipientItems: res.data.data
		});
	};

	/**
	 * Load next page results
	 */
	loadMore = () => {
		this.setState(
			prevState => ({
				page: prevState.page + 1,
				scrolling: true
			}),
			this.loadData
		);
	};

	/**
	 * Lifecycle method to trigger loading available items
	 */
	componentDidMount = async () => {
		// console.log(this.state)
		console.log('history component');
		console.log(this.props);
		await this.loadData();
	};

	/**
	 * Update state with type of history required
	 * @param {Object} event onChange event for user input
	 */
	setHistory = (event) => {
		console.log('radio', event);
		this.setState({
			history: event.target.value
		});
	};

	/**
	 * Set modal display to be true
	 * @param {Boolean} value True to display the modal, false otherwise
	 */
	setIsModalOpen = (value) => {
		this.setState({
			isModalOpen: value
		});
	};

	/**
	 * Show an alert with donor information
	 * @param {String} email Email of the donor
	 */
	showDonorContact = (email) => {
		alert(`This item is donated by the seller directly, please contact them at : ${email}`);
		// this.setState({
		//     showAlert: !this.state.showAlert
		// })
	};

	/**
	 * Render receiving component
	 * @returns {React.Component} Cards with available items
	 */
	render() {
		const gridStyle = {
			width: '25%',
			textAlign: 'center',
		};

		/**
		 * Store selected item data in state and display model
		 * @param {Object} data Object containing item details
		 */
		const showModal = (data) => {
			this.setState({
				items: {
					...data
				}
			});
			this.setIsModalOpen(true);
		};

		/**
		 * Hide modal when OK button clicked
		 */
		const handleOk = () => {
			// const res= await recieveItemAPI({itemId,userId:this.props.props.userId})
			// const res={status:200,data:{
			//     success:true
			// }}
			// if(res.data.success){
			//     console.log('successfully bought the item')
			// }
			// await this.loadData();
			this.setIsModalOpen(false);
		};

		/**
		 * Hide modal when Cancel button clicked
		 */
		const handleCancel = () => {
			this.setIsModalOpen(false);
		};
		return (
			<>
				{this.state.isModalOpen ? (<Modal title="Basic Modal" open={this.state.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
					<p>Item Name: {this.state.items.itemName}</p>
					<p>Item Quantity: {this.state.items.itemQuantity}</p>
					<p>Item Description: {this.state.items.itemDescription}</p>
					<p>Item Zip Code: {this.state.items.itemZipCode}</p>
					<p>Item City: {this.state.items.itemCity}</p>
					<p>Item Category: {this.state.items.itemCategory}</p>
				</Modal>) : (<></>)}
				<Card title="market place">
					{this.state.recipientItems.length > 0 ? (
						this.state.recipientItems.map((d) => (
							<Card.Grid style={gridStyle}>
								<Card
									style={{
										width: 100,
									}}
									cover={
										<img
											alt="example"
											src="https://picsum.photos/300/200"
										/>
									}
								// actions={[
								//   <FolderViewOutlined key="view" />
								// ]}
								>
									<Meta
										avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
										title={d.itemName}
										description={d.itemDescription}
									/>
									<Button type="primary" onClick={() => showModal(d)}>
										View Details
									</Button>
									<Button type="primary" onClick={() => this.showDonorContact(d.donorEmail)}>
										Contact Donor
									</Button>
									{/* {this.state.showAlert ? (<Alert
                                        message="Donor Details"
                                        description={`email: ${d.donorEmail}`}
                                        type="info"
                                        showIcon
                                    />) : (<div></div>)} */}


								</Card>
							</Card.Grid>
						))
					) : (<></>)}
				</Card>
			</>);
	}
}

export default MarketPlace;
