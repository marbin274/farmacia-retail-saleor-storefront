import { IAvailableShippingMethods } from "@temp/@sdk/api/Checkout/types";
import { ISlots } from "@temp/@sdk/repository";

const shippingMethods: IAvailableShippingMethods = [
  {
    __typename: "ShippingMethod",
    id: "1",
    isScheduled: false,
    name: "75 minutos aproximadamente",
    price: {
      __typename: "Money",
      amount: 32,
      culture: "es-PE",
      currency: "USD",
    },
    scheduleDates: [],
    subtitle: "subTitle",
  },
  {
    __typename: "ShippingMethod",
    id: "2",
    isScheduled: true,
    name: "Extra",
    price: {
      __typename: "Money",
      amount: 64,
      culture: "es-PE",
      currency: "USD",
    },
    scheduleDates: [
      {
        __typename: "ScheduleByDate",
        date: new Date(),
        scheduleTimes: [
          {
            __typename: "ScheduleTime",
            endTime: "10:00:00",
            id: "1",
            startTime: "12:00:00",
          },
        ],
      },
    ],
    subtitle: "subTitle",
  },
];

const slots: ISlots = {
  scheduled: [
    {
      id:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcm9tIjoiMjAyMS0wNi0wMlQwNTowMDowMC4wMDBaIiwidG8iOiIyMDIxLTA2LTAyVDA4OjU5OjAwLjAwMFoiLCJvcGVyYXRpb25hbE1vZGVsIjoiUElDS19BTkRfREVMSVZFUllfV0lUSF9TVE9SQUdFIiwic3RhcnRUaW1lQnlUYXNrIjp7IlBJQ0tJTkdfV0lUSF9TVE9SQUdFIjoiMjAyMS0wNi0wMlQwNDo1MTowMC4wMDBaIiwiU1RPUkFHRSI6IjIwMjEtMDYtMDJUMDU6MDA6MDAuMDAwWiIsIlBJQ0tfVVBfRk9SX0RFTElWRVJZIjoiMjAyMS0wNi0wMlQwNToxNTowMC4wMDBaIiwiREVMSVZFUllfV0lUSF9TVE9SQUdFIjoiMjAyMS0wNi0wMlQwNTowMDowMC4wMDBaIn0sInJlYXNvbiI6Ik5PVF9BUFBMSUNBQkxFIiwiam9iUXVvdGVJZCI6ImRlNGU3ZDMxLTNkY2QtNGVkYS1hNDFiLWYwNTU3YzUxOTA0NSIsImV4cGlyZXNBdCI6IjIwMjEtMDYtMDFUMjE6MzY6NDAuNDg5WiIsImlhdCI6MTYyMjU4MjUwMCwiZXhwIjoxNjIyNTgzNDAwfQ.eHlaoWSQSlodZS47Z8dLAptbn-OOByV1aItB5xfCs0Q",
      slotFrom: "2021-06-02T05:00:00.000Z",
      slotTo: "2021-06-02T08:59:00.000Z",
    },
    {
      id:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcm9tIjoiMjAyMS0wNi0wMlQwOTowMDowMC4wMDBaIiwidG8iOiIyMDIxLTA2LTAyVDEyOjU5OjAwLjAwMFoiLCJvcGVyYXRpb25hbE1vZGVsIjoiUElDS19BTkRfREVMSVZFUllfV0lUSF9TVE9SQUdFIiwic3RhcnRUaW1lQnlUYXNrIjp7IlBJQ0tJTkdfV0lUSF9TVE9SQUdFIjoiMjAyMS0wNi0wMlQwODoxMTowMC4wMDBaIiwiU1RPUkFHRSI6IjIwMjEtMDYtMDJUMDg6MjA6MDAuMDAwWiIsIlBJQ0tfVVBfRk9SX0RFTElWRVJZIjoiMjAyMS0wNi0wMlQwODo0NjowMC4wMDBaIiwiREVMSVZFUllfV0lUSF9TVE9SQUdFIjoiMjAyMS0wNi0wMlQwODozMTowMC4wMDBaIn0sInJlYXNvbiI6Ik5PVF9BUFBMSUNBQkxFIiwiam9iUXVvdGVJZCI6ImRlNGU3ZDMxLTNkY2QtNGVkYS1hNDFiLWYwNTU3YzUxOTA0NSIsImV4cGlyZXNBdCI6IjIwMjEtMDYtMDFUMjE6MzY6NDAuNDg5WiIsImlhdCI6MTYyMjU4MjUwMCwiZXhwIjoxNjIyNTgzNDAwfQ.rXlQszm4qmCRCZkMKDhPvTpDO64xNg_U4co4pFCBYHo",
      slotFrom: "2021-06-02T09:00:00.000Z",
      slotTo: "2021-06-02T12:59:00.000Z",
    },
  ],
  express: [
    {
      id:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcm9tIjoiMjAyMS0wNi0wMlQxMzowMDowMC4wMDBaIiwidG8iOiIyMDIxLTA2LTAyVDE2OjU5OjAwLjAwMFoiLCJvcGVyYXRpb25hbE1vZGVsIjoiUElDS19BTkRfREVMSVZFUllfV0lUSF9TVE9SQUdFIiwic3RhcnRUaW1lQnlUYXNrIjp7IlBJQ0tJTkdfV0lUSF9TVE9SQUdFIjoiMjAyMS0wNi0wMlQxMjoxMTowMC4wMDBaIiwiU1RPUkFHRSI6IjIwMjEtMDYtMDJUMTI6MjA6MDAuMDAwWiIsIlBJQ0tfVVBfRk9SX0RFTElWRVJZIjoiMjAyMS0wNi0wMlQxMjo0NjowMC4wMDBaIiwiREVMSVZFUllfV0lUSF9TVE9SQUdFIjoiMjAyMS0wNi0wMlQxMjozMTowMC4wMDBaIn0sInJlYXNvbiI6Ik5PVF9BUFBMSUNBQkxFIiwiam9iUXVvdGVJZCI6ImRlNGU3ZDMxLTNkY2QtNGVkYS1hNDFiLWYwNTU3YzUxOTA0NSIsImV4cGlyZXNBdCI6IjIwMjEtMDYtMDFUMjE6MzY6NDAuNDg5WiIsImlhdCI6MTYyMjU4MjUwMCwiZXhwIjoxNjIyNTgzNDAwfQ.d9F34-P9Qbi44NsYDI5jtncqrasJobrs15I71BeqbZ8",
      slotFrom: "2021-06-02T13:00:00.000Z",
      slotTo: "2021-06-02T16:59:00.000Z",
    },
  ],
  datetime: "2021-06-03T15:47:06.208372",
};

export const DEFAULT_PROPS = {
  shippingMethods,
  slots,
};
