# Generated by Django 4.2.2 on 2023-08-31 01:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("event_board", "0003_event_end_date_event_start_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="end_date",
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
