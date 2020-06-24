import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import List from '../List';
interface Event {
  name: string;
  date: Date;
}
const eventsList: Event[] = [
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
  {name: 'Urodziny Halinki', date: new Date(14.05)},
];
const RememberDate = () => {
  const [datesOfEvents, setDatesOfEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  useEffect(() => {
    setEventsAndDates();
  }, []);
  const setEventsAndDates = () => {
    for (let index = 0; index < 5; index++) {
      setDatesOfEvents((prev) => {
        const arr = [
          ...prev,
          eventsList[Math.floor(Math.random() * eventsList.length)],
        ];
        return arr;
      });
    }
    for (let index = 0; index < 5; index++) {
      setEvents((prev) => {
        const arr = [...prev, datesOfEvents[index].name];
        return arr;
      });
    }
    for (let index = 0; index < 5; index++) {
      setDates((prev) => {
        const arr = [...prev, datesOfEvents[index].date];
        return arr;
      });
    }
  };
  const shuffleEventsAndDates = () => {};
  const checkAnswer = (event: string, date: Date) => {};
  return (
    <View>
      <Text>Dopasuj daty do osób</Text>
      <List data={events} />
      <List
        data={dates.map((item) => {
          return item.toDateString();
        })}
      />
    </View>
  );
};

export default RememberDate;
