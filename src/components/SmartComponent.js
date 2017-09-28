'use-strict'
import React, { Component } from 'react';
import '../css/App.css';
import {getData} from '../dataStructure';
import DumbComponent from './DumbComponent';


class SmartComponent extends Component {
  constructor(props) {
      super(props);
      let appData = getData();
      appData.forEach(function(value, index) {
        value['questionId'] = index + 1; // because index start from '0' and we're displaying value from '1'.
      });
      //>>>>>>>>>>>>>>>>>>>>>>>> setup initial state by assuming user is at slide#1 and nothing is selected  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      this.state = {
          prevImg: '../src/assets/prev.jpg',
          currentSlide: 1,
          singleSelected:[],
          multiSelected:[],
          availableQuestions: appData
      }
  }
  updateSingleSelected(singleSelectedAns) {
    this.setState({
      'singleSelected': singleSelectedAns
    })
  }
  updateMultiSelected(multiSelectedAns) {
    this.setState({
      'multiSelected': multiSelectedAns
    })
  }
  moveNext(currentIndex) {
    this.setState({
      'currentSlide': currentIndex + 1
    })
  }
  movePrev(currentIndex) {
    this.setState({
      'currentSlide': currentIndex - 1
    })
  }

  render() {
    return (
            <DumbComponent
                singleSelected = {this.state.singleSelected}
                multiSelected = {this.state.multiSelected}
                prevImg = {this.state.prevImg}
                movePrev = {this.movePrev.bind(this)}
                moveNext = {this.moveNext.bind(this)}
                onClickUpdateSingleSelected = {this.updateSingleSelected.bind(this)}
                onClickUpdateMultiSelected = {this.updateMultiSelected.bind(this)}
                availableQuestions = {this.state.availableQuestions}
                userSelectedAnswers = {this.state.userSelectedAnswers}
                totalScore = {this.state.totalScore}
                currentSlide = {this.state.currentSlide}>
            </DumbComponent>
        );
  }
} // App Component end

export default SmartComponent;
