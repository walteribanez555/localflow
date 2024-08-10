// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ServiceMarketplace {
    address public owner;

    struct Service {
        uint id;
        address payable provider;
        address payable consumer;
        uint price;
        string description;
        bool isCompleted;
    }

    struct Review {
        address consumer;
        uint serviceId;
        string reviewText;
        uint rating; // Rating from 1 to 5
    }

    mapping(uint => Service) public services;
    mapping(uint => Review[]) public serviceReviews;
    uint public serviceCount;

    event ServiceListed(uint serviceId, uint price, address provider, string description);
    event ServicePurchased(uint serviceId, address consumer);
    event ServiceCompleted(uint serviceId);
    event ReviewSubmitted(uint serviceId, address consumer, string reviewText, uint rating);
    event ServiceDisputed(uint serviceId, address consumer);

    modifier onlyProvider(uint _serviceId) {
        require(services[_serviceId].provider == msg.sender, "Only provider can perform this action");
        _;
    }

    modifier onlyConsumer(uint _serviceId) {
        require(services[_serviceId].consumer == msg.sender, "Only consumer can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function listService(uint _price, string memory _description) public {
        serviceCount++;
        services[serviceCount] = Service(serviceCount, payable(msg.sender), payable(address(0)), _price, _description, false);
        emit ServiceListed(serviceCount, _price, msg.sender, _description);
    }

    function buyService(uint _serviceId) public payable {
        Service storage service = services[_serviceId];
        require(msg.value == service.price, "Incorrect price");
        require(!service.isCompleted, "Service already completed");
        require(service.provider != msg.sender, "Cannot buy your own service");

        service.consumer = payable(msg.sender);
        service.isCompleted = true;
        service.provider.transfer(msg.value);

        emit ServicePurchased(_serviceId, msg.sender);
    }

    function completeService(uint _serviceId) public onlyProvider(_serviceId) {
        Service storage service = services[_serviceId];
        require(service.isCompleted, "Service not purchased yet");

        service.isCompleted = true;
        emit ServiceCompleted(_serviceId);
    }

    function leaveReview(uint _serviceId, string memory _reviewText, uint _rating) public onlyConsumer(_serviceId) {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        
        serviceReviews[_serviceId].push(Review(msg.sender, _serviceId, _reviewText, _rating));
        emit ReviewSubmitted(_serviceId, msg.sender, _reviewText, _rating);
    }

    function disputeService(uint _serviceId) public onlyConsumer(_serviceId) {
        Service storage service = services[_serviceId];
        require(!service.isCompleted, "Service already completed");
        
        // Implement dispute logic here, like freezing the funds
        emit ServiceDisputed(_serviceId, msg.sender);
    }
}
