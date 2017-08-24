import React               from 'react';
import PropTypes           from 'prop-types';
import Autocomplete        from 'react-autocomplete';
import { connect         } from 'react-redux';
import { debounce        } from './../constants/debounce';
import * as reducerActions from './../actions/reducerActions';
import {
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class Address extends React.Component {
  constructor(props) {
    super(props);

    this.callSearch = debounce(this.callSearch, 400);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      cityInput: props.addresses[props.index].address.city || 'No city available',
      streetInput: props.addresses[props.index].address.road || 'No street available',
      zipInput: props.addresses[props.index].address.postcode || 'No zip code available'
    };
  }

  callSearch(event, field) {
    if (event.target.value.length > 2) {
      if (field === 'cityInput') {
        this.props.getAddressesByName('city', event.target.value);
      }

      if (field === 'streetInput') {
        this.props.getAddressesByName('street', event.target.value);
      }

      if (field === 'zipInput') {
        this.props.getAddressesByName('postalcode', event.target.value);
      }
    }
  }

  handleInputChange(event, field) {
    event.persist();
    this.setState({
      [field]: event.target.value
    });

    this.callSearch(event, field);
  }

  onSelectPossible(address) {
    this.props.setAddress(address, this.props.index);
    console.log(this.props.addresses);
    this.setState({
      cityInput: this.props.addresses[this.props.index].address.city || 'No city available',
      streetInput: this.props.addresses[this.props.index].address.road || 'No street available',
      zipInput: this.props.addresses[this.props.index].address.postcode || 'No zip code available'
    });
  }

  render() {
    return (
      <Form className='mt-3'>
        <FormGroup>
          <Label for='city'>City: </Label>
          <Autocomplete
            selectOnBlur={true}
            getItemValue={(item) => item.display_name}
            items={this.props.possibleAddresses}
            renderItem={(item) =>
              <a href="#" className="list-group-item list-group-item-action">{item.display_name}</a>
            }
            value={this.state.cityInput}
            onChange={(event) => this.handleInputChange(event, 'cityInput')}
            inputProps={{
              className: 'form-control',
              id: 'city'
            }}
            wrapperStyle={{'width': '100%'}}
            renderMenu={(items, value) => (
              <div className="list-group">
                {value === '' ? (
                  <div className="alert alert-warning">Enter city name</div>
                ) : items.length === 0 ? null : (
                  <div className='list-group'>
                    {this.props.possibleAddresses.map((address, index) => {
                      return (
                        <a
                          key={index}
                          href="#"
                          onClick={() => this.onSelectPossible(address)}
                          className="list-group-item list-group-item-action">
                          {address.display_name}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          />
        </FormGroup>
        <FormGroup>
          <Label for='street'>Street</Label>
          <Input
            id='street'
            type='text'
            placeholder='Enter  street...'
            value={this.state.streetInput}
            onChange={(event) => this.handleInputChange(event, 'streetInput')}
          />
        </FormGroup>
        <FormGroup>
          <Label for='zip'>ZIP</Label>
          <Input
            id='zip'
            type='text'
            placeholder='Enter  street...'
            value={this.state.zipInput}
            onChange={(event) => this.handleInputChange(event, 'zipInput')}
          />
        </FormGroup>
      </Form>
    );
  }
}

Address.propTypes = {
  index:              PropTypes.number,
  addresses:          PropTypes.array,
  possibleAddresses:  PropTypes.array,
  getAddressesByName: PropTypes.func.isRequired,
  setAddress:         PropTypes.func.isRequired
};

Address.defaultProps = {
  index: 0,
  isFetching: false,
  addresses: [],
  possibleAddresses: []
};

const mapStateToProps = (state) => {
  return {
    addresses:         state.Reducer.addresses,
    possibleAddresses: state.Reducer.possibleAddresses
  };
};

const mapDispatchToProps = {
  getAddressesByName: reducerActions.getAddressesByName,
  setAddress:         reducerActions.setAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
