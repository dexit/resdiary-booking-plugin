import React from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import moment from 'moment';

const InfoSearchTimes = ({tabIndex, handleTabSelect, availability, handleTimeSlotClick, unavailableText}) => {

  return (
    <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
      <TabList>
        <Tab>Useful Info</Tab>
        <Tab disabled={!availability.length}>Available Times</Tab>
      </TabList>
      <TabPanel id="info">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
      </TabPanel>
      <TabPanel>
        <dl id="available-times">
          {availability.map((area, i) => (
            <div key={`available-times-${i}`}>
              <dt>{area.Name}</dt>
              {area.TimeSlots.length ?
               <dd>
                 {area.TimeSlots.map((slot, i) => (
                   <button
                     type="button"
                     value={JSON.stringify({time: slot.TimeSlot, area: {id: area.Id, name: area.Name}})}
                     key={`time-slot-${i}`}
                     onClick={handleTimeSlotClick}
                   >
                     {moment.utc(slot.TimeSlot).format('HH mm')}
                   </button>
                 ))}
               </dd>
                : <dd className="unavailable">{unavailableText}</dd>
              }
            </div>
          ))}
        </dl>
      </TabPanel>
    </Tabs>
  );
};

export default InfoSearchTimes;
