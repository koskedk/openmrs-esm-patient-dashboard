import React from "react";
import axios from "axios";

export class AddressForm extends React.Component<any, any> {
  state = {
    patientUuid: "",
    uuid: "",
    address1: "",
    address2: "",
    cityVillage: "",
    stateProvince: "",
    country: "",
    postalCode: "",
    submitForm: false,
    submitFormLabel: "Save"
  };

  componentDidMount(): void {
    this.setState({ ...this.props });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      submitForm: true,
      submitFormLabel: "Saving..."
    });

    axios
      .post(
        `/openmrs/ws/rest/v1/person/${this.state.patientUuid}/address/${this.state.uuid}`,
        this.getAddress()
      )
      .then(response => {
        this.setState({
          submitForm: false,
          submitFormLabel: "Save"
        });
        this.props.onSubmitted(this.state.patientUuid);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  getAddress = () => {
    let {
      address1,
      address2,
      cityVillage,
      stateProvince,
      country,
      postalCode
    } = this.state;

    return {
      address1,
      address2,
      cityVillage,
      stateProvince,
      country,
      postalCode
    };
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="address1">Address Line 1</label>
            <input
              className="form-control"
              id="address1"
              type="text"
              value={this.state.address1}
              onChange={event =>
                this.setState({ address1: event.target.value })
              }
              placeholder="Address Line 1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address2">Address Line 2</label>
            <input
              className="form-control"
              id="address2"
              type="text"
              value={this.state.address2}
              onChange={event =>
                this.setState({ address2: event.target.value })
              }
              placeholder="Address Line 2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cityVillage">City/Village</label>
            <input
              className="form-control"
              id="cityVillage"
              type="text"
              value={this.state.cityVillage}
              onChange={event =>
                this.setState({ cityVillage: event.target.value })
              }
              placeholder="City/Village"
            />
          </div>
          <div className="form-group">
            <label htmlFor="stateProvince">State/Province</label>
            <input
              className="form-control"
              id="stateProvince"
              type="text"
              value={this.state.stateProvince}
              onChange={event =>
                this.setState({ stateProvince: event.target.value })
              }
              placeholder="State/Province"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              className="form-control"
              id="country"
              type="text"
              value={this.state.country}
              onChange={event => this.setState({ country: event.target.value })}
              placeholder="Country"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              className="form-control"
              id="postalCode"
              type="text"
              value={this.state.postalCode}
              onChange={event =>
                this.setState({ postalCode: event.target.value })
              }
              placeholder="Postal Code"
            />
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.state.submitForm}
          >
            {this.state.submitFormLabel}
          </button>
        </form>
      </div>
    );
  }
}
