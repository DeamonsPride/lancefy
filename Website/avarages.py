import matplotlib.pyplot as plt
import numpy as np

from pyscript import display

fig, ax_h = plt.subplots(figsize=(10, 4))
ax_t = ax_h.twinx()


humidity = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
counts = [40, 45, 46, 37, 32, 25, 12, 10, 15, 18, 26, 35]
ax_h.bar(humidity, counts, label="Avg. Humidity", color='#11C8E4')

temperature = [-10, 0, 5, 17, 27, 34, 36, 32, 25, 15, 7, -4]
temp_labels = ['Avg. Temperature', '_Avg. Temperature', '_Avg. Temperature', '_Avg. Temperature', '_Avg. Temperature', '_Avg. Temperature', '_Avg. Temperature', '_Avg. Temperature', '_Avg. Temperature', '_Avg. Temperature', '_Avg. Temperature', '_Avg. Temperature',]
ax_t.plot(temperature, label="Avg. Temperature", color='#D95117')

ax_h.set_ylabel('Humidity in %', loc='center')
ax_t.set_ylabel('Temperature in °C', loc='center')
ax_h.set_xlabel('Time in months', loc='center')
ax_h.set_title('Avarage humidity & temperature over a year', loc='center')
ax_h.spines[['top']].set_visible(False)
ax_t.spines[['top']].set_visible(False)
ax_h.legend(loc='upper left')
ax_t.legend(loc='upper right')

display(fig, target="avg")