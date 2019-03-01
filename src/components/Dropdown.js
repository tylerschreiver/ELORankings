import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Text } from 'react-native';

class Dropdown extends Component {
  state = {
    isOpen: false,
    selectedItems: []
  }

  isItemSelected(item) {
    const { selectedItems } = this.state;
    return selectedItems.find((i) => i.key === item.key) !== undefined;
  }

  addOrRemoveItem(item) {
    const { selectedItems } = this.state;
    const { multiselect } = this.props;

    if (multiselect) {
      if (this.isItemSelected(item)) {
        let itemToRemove = selectedItems.indexOf(item);
        let newSelectedItems = selectedItems;
        newSelectedItems.splice(itemToRemove, 1)
        
        this.setState({ selectedItems: newSelectedItems }, () => {
          this.props.onChange(selectedItems);
        });
      }
      else {
        let newItems = selectedItems;
        newItems.push(item);
        this.setState({ selectedItems: newItems }, () => {
          this.props.onChange(selectedItems);
        });
      }
    } else {
      this.setState({ selectedItems: [item] }, () => {
        this.props.onChange(this.state.selectedItems);
      });
    }
  }

  renderItems() {
    const { items } = this.props;
    const { rowStyle, finalRowStyle } = styles;

    if (this.state.isOpen) {
      return items.map((item, i) =>  {
        return (
          <View style={i === items.length - 1 ? finalRowStyle : rowStyle} key={item.key} onTouchEnd={() => this.addOrRemoveItem(item)}>
            <Text style={ this.isItemSelected(item) ? { color: 'red' } : { color: 'black' } }>{item.name}</Text>
          </View>
        );
      })
    } else return null;
  }

  render() {
    const { placeholder, dropdownStyle } = this.props;
    const { isOpen } = this.state;
    const { autoDropdownStyle, placeholderStyle } = styles;
    let totalDropdownStyle = { ...autoDropdownStyle, ...dropdownStyle };

    return (
      <View>
        <View style={totalDropdownStyle}>
          <TouchableNativeFeedback onPress={() => { this.setState({ isOpen: !isOpen })}}>
            <Text style={placeholderStyle}>{placeholder}</Text>
          </TouchableNativeFeedback>

          <View style={ isOpen ? { display: 'flex' } : { display: "none" } }>
            {this.renderItems()}
          </View>

        </View>
      </View>
    );
  }

}
const styles = {
  autoDropdownStyle: {
    paddingTop: 10,
    height: 'auto',
    borderColor: 'rebeccapurple',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rebeccapurple'
  },
  placeholderStyle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  rowStyle: {
    backgroundColor: 'white',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  finalRowStyle: {
    backgroundColor: 'white',
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: 'white'
  }
}


export { Dropdown };