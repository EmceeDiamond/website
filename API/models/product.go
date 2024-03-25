package models

type Provider struct {
	ProviderId string `json:"provider_id"`

	ProviderName string `json:"provider_name"`

	INN string `json:"INN"`

	ContactDetails string `json:"contact_details"`

	RF string `json:"RF"`

	Status string `json:"status"`

	Rating string `json:"rating"`
}

type Product struct {
	ProviderId int `json:"provider_id"`

	ElementId string `json:"element_id"`

	ElementName string `json:"element_name"`

	Quantity int64 `json:"quantity"`

	Price string `json:"price"`

	Amount string `json:"amount"`

	Deadline string `json:"deadline"`
}

/*
*
In GO exported variable and function name
must start with big cap
*/
